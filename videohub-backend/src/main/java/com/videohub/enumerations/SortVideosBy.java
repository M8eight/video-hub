package com.videohub.enumerations;

public enum SortVideosBy {
    VIEWS("views"),
    RATING("rating"),
    NEW("new"),
    OLD("old");

    private final String value;

    SortVideosBy(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}

