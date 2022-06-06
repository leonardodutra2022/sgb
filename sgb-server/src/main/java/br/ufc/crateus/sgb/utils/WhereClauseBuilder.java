package br.ufc.crateus.sgb.utils;

import javax.annotation.Nullable;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.Visitor;
import com.querydsl.core.types.dsl.BooleanExpression;

public class WhereClauseBuilder implements Predicate {

	private static final long serialVersionUID = 975834145848384908L;
	
	private BooleanBuilder delegate;

	public WhereClauseBuilder() {
		this.delegate = new BooleanBuilder();
	}

	public WhereClauseBuilder(Predicate pPredicate) {
		this.delegate = new BooleanBuilder(pPredicate);
	}

	private WhereClauseBuilder and(Predicate right) {
		return new WhereClauseBuilder(delegate.and(right));
	}

	public <V> WhereClauseBuilder optionalAnd(@Nullable V pValue, LazyBooleanExpression pBooleanExpression) {
		if (pValue != null) {
			return and(pBooleanExpression.get());
		}
		return this;
	}

	@FunctionalInterface
	public interface LazyBooleanExpression {
		BooleanExpression get();
	}

	@Override
	public <R, C> R accept(Visitor<R, C> v, C context) {
		return this.delegate.accept(v, context);
	}

	@Override
	public Class<? extends Boolean> getType() {
		return this.delegate.getType();
	}

	@Override
	public Predicate not() {
		return this.delegate.not();
	}

}
