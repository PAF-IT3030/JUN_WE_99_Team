package com.exercise.demo.Service;

import com.exercise.demo.Entity.Member;
import com.exercise.demo.Repo.MemberRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberServices {

    @Autowired
    private MemberRepo repo;

    public void saveorUpdate(Member members) {

        repo.save(members);
    }

    public Iterable<Member> listAll() {

        return this.repo.findAll();
    }


    public void deleteMember(String id) {

        repo.deleteById(id);
    }

    public Member getMemberByID(String memberid) {

        return repo.findById(memberid).get();
    }
}
