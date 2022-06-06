package br.ufc.crateus.sgb.model;

import java.time.LocalTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Horario implements Comparable<Horario>{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private LocalTime entrada;
	
	private LocalTime saida;
	
	private long totalMinutos;

	public LocalTime getEntrada() {
		return entrada;
	}

	public void setEntrada(LocalTime entrada) {
		this.entrada = entrada;
	}

	public LocalTime getSaida() {
		return saida;
	}

	public void setSaida(LocalTime saida) {
		this.saida = saida;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getTotalMinutos() {
		return totalMinutos;
	}

	public void setTotalMinutos(long totalMinutos) {
		this.totalMinutos = totalMinutos;
	}

	@Override
	public int compareTo(Horario outroHorario) {
		if(this.entrada.isBefore(outroHorario.getEntrada()))
			return -1;

		if(this.entrada.isAfter(outroHorario.getEntrada()))
			return 1;
		
		return 0;
	}
}
