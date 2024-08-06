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
            'title' => $this->title,
            'desc' => $this->desc,
            'price' => $this->price,
            'discount' => $this->price,
            'item_code' => $this->item_code,
            'islot' => $this->islot,
            'vip' => $this->vip,
            'day' => $this->day,
            'category' => $this->category,
            'icon' => $this->icon,
            'lable' => $this->lable,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }

}
