<?php

use App\Models\Core\Vault;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vault', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->decimal('balance', 20, 2)->default(0);
            $table->decimal('total_in', 20, 2)->default(0);
            $table->decimal('total_out', 20, 2)->default(0);
            $table->decimal('rtp_target', 20, 2)->default(0);
            $table->integer('big_win_chance')->default(5);
            $table->timestamps();
        });

        Vault::create([]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vault');
    }
};
