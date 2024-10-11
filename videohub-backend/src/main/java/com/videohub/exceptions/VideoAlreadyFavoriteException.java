package com.videohub.exceptions;

public class VideoAlreadyFavoriteException extends RuntimeException {
  public VideoAlreadyFavoriteException(String message) {
    super(message);
  }
}
