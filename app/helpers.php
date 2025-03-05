
<?php

if (! function_exists('usr')) {
    /*
     * Get the current user.
     */
    function usr(): ?App\Models\User
    {
        return request()->user();
    }
}
