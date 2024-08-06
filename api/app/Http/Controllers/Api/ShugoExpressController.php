<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Http\Resources\ProductResource;
use App\Http\Requests\PurchaseProductRequest;
use App\Services\VipService;
use App\Services\ShugoShopService;
use Illuminate\Support\Facades\Log;
use App\Services\UserService;
use Illuminate\Http\Request;

class ShugoExpressController extends Controller
{

    protected $vipService;
    protected $shugoShopService;
    protected $userService;

    public function __construct()
    {
        $this->vipService = new VipService;
        $this->shugoShopService = new ShugoShopService;
        $this->userService = new UserService;
    }

    public function getProduct(Request $request)
    {

        $products = Product::all()
            ->sortByDesc('priority')
            ->sortBy([
                'category' => 'asc',
                'created_at' => 'asc',
            ])
            ->where('active', 1);


        return ProductResource::collection($products);
    }

    public function productPurchase(PurchaseProductRequest $request)
    {


        Log::info($request);
        $valid = $request->validated();
        $ip = $request->getClientIp();
        $user = $request->user();

        $data = [
            'user' => $user,
            'product' => Product::find($valid['id']),
            'personId' => $valid['personId'],
            'personName' => $valid['personName'],
            'title' => $valid['title'],
            'item_code' => $valid['item_code'],
            'ip' => $ip,
            'lot' => $valid['lot'],
        ];

        if ($data['product']->vip) {

            $status = $this->vipService->vipConnection($data);
        } else {

            $status = $this->shugoShopService->giveProduct($data);
        }

        $connectionVipLog = $this->userService->getConnectionVipLog($user->name);
        $purchasedLog = $this->userService->getPurchasedLog($user->name);


        return response(compact('user', 'status', 'purchasedLog', 'connectionVipLog'));
    }
}
