package com.videohub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.SpringVersion;

@SpringBootApplication
public class VideohubApplication {
	public static void main(String[] args) {
		System.out.println(SpringVersion.getVersion());
		SpringApplication.run(VideohubApplication.class, args);
	}
}
