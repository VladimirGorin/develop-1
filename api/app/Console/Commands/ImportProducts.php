<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Product;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class ImportProducts extends Command
{

    // php artisan import:products products.json

    protected $signature = 'import:products {file}';
    protected $description = 'Import products from a JSON file';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $file = $this->argument('file');
        $filePath = storage_path("app/imports/{$file}");

        if (!File::exists($filePath)) {
            $this->error("File not found: {$filePath}");
            return 1;
        }

        $json = File::get($filePath);
        $data = json_decode($json, true);

        foreach ($data as $item) {
            Product::create([
                'title_ru' => $item['title_ru'],
                'title_en' => $item['title_en'],
                'item_code' => $item['item_code'],
                'category_ru' => $item['category_ru'],
                'category_en' => $item['category_en'],
                'icon' => $item['icon'],
                'lable' => $item['lable'],
                'desc_ru' => $item['desc_ru'],
                'desc_en' => $item['desc_en'],
                'price' => $item['price'],
                'discount' => $item['discount'],
                'islot' => $item['islot'],
                'priority' => $item['priority'],
                'vip' => $item['vip'],
                'day' => $item['day'],
                'active' => $item['active']
            ]);
        }

        $this->info('Products imported successfully.');
        return 0;
    }
}
