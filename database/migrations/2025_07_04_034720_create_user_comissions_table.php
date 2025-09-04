<?php

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
        Schema::create('user_comissions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id');
            $table->bigInteger('baseline')->default(0);
            $table->bigInteger('revenue_share')->default(0);
            $table->bigInteger('revenue_fake')->default(0);
            $table->bigInteger('sub_percentage')->default(0);
            $table->bigInteger('cpa_value')->default(0);
            $table->bigInteger('cpa_chance')->default(0);
            $table->string('cpa_type')->default('fixed');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_comissions');
    }
};
