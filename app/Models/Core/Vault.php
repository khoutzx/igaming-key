<?php

namespace App\Models\Core;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Vault extends Model
{
    use HasUuids;
    protected $table = 'vault';
}
