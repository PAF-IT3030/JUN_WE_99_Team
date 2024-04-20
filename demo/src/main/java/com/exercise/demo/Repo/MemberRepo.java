package com.exercise.demo.Repo;

import com.exercise.demo.Entity.Member;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepo extends MongoRepository<Member,String> {
}
