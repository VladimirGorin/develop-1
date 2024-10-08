<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use App\Services\LogService;

class VipService
{

    protected $aion_ls;
    protected $logService;

    public function __construct()
    {
        $this->aion_ls = DB::connection('aion_ls');
        $this->logService = new LogService;
    }

    public function vipConnection($data) {

        $user = $data['user'];
        $product = $data['product'];
        
        // validate
        if($user->active) {
            return 'Выбран неактивный продукт';
        }
        if($user->coin < $product->price) {
            return 'Недостаточно WP';
        }

        // check vip status
        $currentEndDateVipStatus = $this->aion_ls->table('account_data')
                    ->where('name', $user->name)
                    ->value('expire');
        
        if ($currentEndDateVipStatus !== null) {

            $parseDate = Carbon::parse($currentEndDateVipStatus);
            $newEndDateVipStatus = $parseDate->addDays($product->day);

        }else {
            $newEndDateVipStatus = Carbon::now()->addDays($product->day);
        }

        // connect vip status
        $this->aion_ls->table('account_data')->where('name', $user->name)
                    ->update([
                        'membership' => 2,
                        'expire' => $newEndDateVipStatus
                    ]);
        
        // calc coin
        $calcCoinAfterBuy = $user->coin - $product->price;

        $user->update([
            'coin' => $calcCoinAfterBuy,
        ]);
        
        // log table
        $this->logService->connectVipLogs($data);

        return "Успешное подключение";
    }

}
