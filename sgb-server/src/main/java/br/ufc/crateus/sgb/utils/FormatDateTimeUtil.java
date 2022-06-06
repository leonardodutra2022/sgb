package br.ufc.crateus.sgb.utils;

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

public class FormatDateTimeUtil {
	
	static public String formatDate(ZonedDateTime dateTime) {
		return DateTimeFormatter.ofPattern("dd/MM/yyyy").format(dateTime);
	}
	
	static public String formatTime(ZonedDateTime dateTime) {
		return DateTimeFormatter.ofPattern("HH:mm").format(dateTime);
	}

}
