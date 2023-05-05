package com.oasisbet.account.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.oasisbet.account.view.UserView;

@Repository
public interface IUserDao extends JpaRepository<UserView, Long> {

	Optional<UserView> findByUsernameAndDelIndOrderByIdAsc(String username, String status);

	List<UserView> findAllByDelInd(String delInd);

	UserView findByUsername(String username);

}
