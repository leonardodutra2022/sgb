package br.ufc.crateus.sgb.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

public class ReadFileUtil {
	
	static public String readFile(InputStream fileStream) throws IOException {
		BufferedReader reader = new BufferedReader(new InputStreamReader(fileStream));
		StringBuilder out = new StringBuilder();
		String line;
		try {
			while ((line = reader.readLine()) != null) {
				out.append(line);
				out.append(System.lineSeparator());
			}
			reader.close();
		} catch (IOException e) {
			throw new IOException();
		}
		return out.toString();
	}

}
