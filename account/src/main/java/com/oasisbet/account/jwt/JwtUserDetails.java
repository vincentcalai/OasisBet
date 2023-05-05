package com.oasisbet.account.jwt;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.oasisbet.account.view.UserView;

public class JwtUserDetails implements UserDetails {

	private static final long serialVersionUID = 5155720064139820502L;

	private final Long id;
	private final String username;
	private final String password;
	private final Collection<? extends GrantedAuthority> authorities;

	public JwtUserDetails(UserView user) {
		this.id = user.getId();
		this.username = user.getUsername();
		this.password = user.getPassword();

		// String[] roleArray = user.getRoles().split(", ");

		List<SimpleGrantedAuthority> authorities = new ArrayList<SimpleGrantedAuthority>();
//		for (int i = 0; i < roleArray.length; i++) {
//			authorities.add(new SimpleGrantedAuthority(roleArray[i]));
//		}
		this.authorities = authorities;
	}

//	public JwtUserDetails(Long id, String username, String password, String role) {
//		this.id = id;
//		this.username = username;
//		this.password = password;
//
//		String[] roleArray = role.split(", ");
//
//		List<SimpleGrantedAuthority> authorities = new ArrayList<SimpleGrantedAuthority>();
//		for (int i = 0; i < roleArray.length; i++) {
//			authorities.add(new SimpleGrantedAuthority(roleArray[i]));
//		}
//
//		this.authorities = authorities;
//	}
//
//	@JsonIgnore
//	public Long getId() {
//		return id;
//	}

	@Override
	public String getUsername() {
		return username;
	}

	@JsonIgnore
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@JsonIgnore
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@JsonIgnore
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@JsonIgnore
	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
