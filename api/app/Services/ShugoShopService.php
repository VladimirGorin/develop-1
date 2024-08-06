<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use App\Services\LogService;

class ShugoShopService
{

    protected $aion_ls;
    protected $aion_gs;
    protected $logService;

    public function __construct()
    {
        $this->aion_ls = DB::connection('aion_ls');
        $this->aion_gs = DB::connection('aion_gs');
        $this->logService = new LogService;
    }

    public function giveProduct(array $data){

        Log::info(json_encode($data));

        // validate
        if (!isset($data['personId'])) {
            return 'Выберите персонажа!';
        }
        if(!$data['product']->active) {
            return 'Выбран неактивный продукт';
        }
        if($data['item_code'] == null) {
            return 'Не заполнен item_code';
        }
        if($data['user']->coin < ($data['product']->price * $data['lot'])) {
            return 'Недостаточно WP';
        }

        // calc coin
        $calcCoinAfterBuy = $data['user']->coin - ($data['product']->price * $data['lot']);

        $data['user']->update([
            'coin' => $calcCoinAfterBuy,
        ]);


        // give item
        $this->aion_gs->table('shugo_shop')->insert([
            'recipientName' => $data['personName'],
            'title' => $data['title'],
            'item_code' => $data['item_code'],
            'item_count' => $data['lot'],
        ]);

        // log table
        $this->logService->productLogs($data);

        return "успешная покупка!";
    }

}
