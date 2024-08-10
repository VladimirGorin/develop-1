<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'title_ru', 'title_en', 'item_code', 'category_ru', 'category_en','icon', 'lable', 'desc_ru', 'desc_en', 'price', 'discount',
        'islot', 'priority', 'vip', 'day', 'active'
    ];
}
