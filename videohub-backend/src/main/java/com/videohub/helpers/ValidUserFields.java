package com.videohub.helpers;

public class ValidUserFields {
    /**
    * Validate user field for not null and not blank,
     * if true return first param, false second param
    * */
    public static String validNotNull(String first, String second) {
        return first != null && !(first.isBlank()) ? first : second;
    }
}
