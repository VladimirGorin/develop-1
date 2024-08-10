<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title_ru' => $this->title_ru,
            'title_en' => $this->title_en,
            'desc_ru' => $this->desc_ru,
            'desc_en' => $this->desc_en,
            'price' => $this->price,
            'discount' => $this->price,
            'item_code' => $this->item_code,
            'islot' => $this->islot,
            'vip' => $this->vip,
            'day' => $this->day,
            'category_ru' => $this->category_ru,
            'category_en' => $this->category_en,
            'icon' => $this->icon,
            'lable' => $this->lable,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }

}
