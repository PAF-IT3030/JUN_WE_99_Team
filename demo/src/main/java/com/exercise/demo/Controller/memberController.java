package com.exercise.demo.Controller;

import com.exercise.demo.Entity.Member;
import com.exercise.demo.Service.MemberServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/v1/member")
public class memberController {

    @Autowired
    private MemberServices memberServices;

    @PostMapping(value = "/save")
    private String saveMember(@RequestBody Member members) {

        memberServices.saveorUpdate(members);
        return members.get_id();
    }

    @GetMapping(value = "/getall")
    public Iterable<Member> getMembers() {
        return memberServices.listAll();
    }

    @PutMapping(value = "/edit/{id}")
    private Member update(@RequestBody Member member, @PathVariable(name = "id") String _id) {
        member.set_id(_id);
        memberServices.saveorUpdate(member);
        return member;
    }

    @DeleteMapping("/delete/{id}")
    private void deleteMember(@PathVariable("id") String _id) {
        memberServices.deleteMember(_id);
    }


    @RequestMapping("/search/{id}")
    private Member getMember(@PathVariable(name = "id") String memberid) {
        return memberServices.getMemberByID(memberid);
    }

}
