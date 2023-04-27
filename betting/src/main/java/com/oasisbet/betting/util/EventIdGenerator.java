package com.oasisbet.betting.util;

import java.util.concurrent.atomic.AtomicLong;

public class EventIdGenerator {
	private static final AtomicLong sequence = new AtomicLong(1000);

	public static long nextId() {
		return sequence.incrementAndGet();
	}
}
