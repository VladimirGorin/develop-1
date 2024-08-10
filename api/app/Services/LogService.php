<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use App\Models\PayLog;

class LogService
{
    public function productLogs($data)
    {

        $product = $data['product'];

        DB::table('product_logs')->insert([
            'product_id' => $product->id,
            'account_name' => $data['user']->name,
            'personId' => $data['personId'],
            'personName' => $data['personName'],
            'title' => $product->title_ru,
            'lable' => $product->lable,
            'item_code' => $product->item_code,
            'category' => $product->category_ru,
            'icon' => $product->icon,
            // 'desc' => $product->desc_ru,
            'price' => $product->price,
            'discount' => $product->discount,
            'lot' => $data['lot'],
            'ip' => $data['ip'],
            'created_at' => Carbon::now(),
        ]);
    }
    public function connectVipLogs($data)
    {

        $product = $data['product'];

        DB::table('connect_vip_logs')->insert([
            'account_name' => $data['user']->name,
            'product_id' => $product->id,
            'title' => $product->title,
            'lable' => $product->lable,
            'price' => $product->price,
            'discount' => $product->discount,
            'vip' => $product->vip,
            'day' => $product->day,
            'ip' => $data['ip'],
            'created_at' => Carbon::now(),
            'category' => $product->category,
        ]);
    }

    public function accessLog($user, $ip)
    {

        DB::table('access_user_logs')->insert([
            'account_name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
            'coin' => $user->coin,
            'ip' => $ip,
            'created_at' => Carbon::now(),
        ]);
    }
    public function payLog($transactionData)
    {

        PayLog::create([
            'sender' => $transactionData['sender'],
            'notification_type' => $transactionData['notification_type'],
            'account_id' => $transactionData['account_id'],
            'account_name' => $transactionData['account_name'],
            'withdraw_amount' => $transactionData['withdraw_amount'],
            'operation_label' => $transactionData['operation_label'],
            'operation_id' => $transactionData['operation_id'],
            'pay_system' => $transactionData['pay_system'],
            'created_at' => Carbon::now()
        ]);
    }
}
