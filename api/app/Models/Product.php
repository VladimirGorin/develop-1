<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'item_code', 'category', 'icon', 'lable', 'desc', 'price', 'discount',
        'islot', 'priority', 'vip', 'day', 'active'
    ];
}
