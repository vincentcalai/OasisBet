package com.oasisbet.betting.model;

public class TestSetupEvent {
	private int event_id;
	private String api_event_id;
	private String comp_type;

	public int getEvent_id() {
		return event_id;
	}

	public void setEvent_id(int event_id) {
		this.event_id = event_id;
	}

	public String getApi_event_id() {
		return api_event_id;
	}

	public void setApi_event_id(String api_event_id) {
		this.api_event_id = api_event_id;
	}

	public String getComp_type() {
		return comp_type;
	}

	public void setComp_type(String comp_type) {
		this.comp_type = comp_type;
	}

}
