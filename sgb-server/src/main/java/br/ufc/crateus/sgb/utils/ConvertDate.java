package br.ufc.crateus.sgb.utils;

import java.time.LocalDate;
import java.time.ZonedDateTime;

public class ConvertDate {
	
	static public LocalDate convertZonedDateToLocalDate(ZonedDateTime zonedDate) {
		return LocalDate.from(zonedDate);
	}

}
