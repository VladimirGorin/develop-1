<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Product;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class ImportProducts extends Command
{
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
                'title' => $item['title'],
                'item_code' => $item['item_code'],
                'category' => $item['category'],
                'icon' => $item['icon'],
                'lable' => $item['lable'],
                'desc' => $item['desc'],
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
