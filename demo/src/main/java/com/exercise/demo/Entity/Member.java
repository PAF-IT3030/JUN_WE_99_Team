package com.exercise.demo.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection ="members")
public class Member {

    @Id
    private String _id;
    private String rotine;
    private String exercise;
    private String repetitions;
    

    
    public Member() {
    }
    public Member(String _id, String rotine, String exercise, String repetitions) {
        this._id = _id;
        this.rotine = rotine;
        this.exercise = exercise;
        this.repetitions = repetitions;
    }
    public String get_id() {
        return _id;
    }
    public void set_id(String _id) {
        this._id = _id;
    }
    public String getRotine() {
        return rotine;
    }
    public void setRotine(String rotine) {
        this.rotine = rotine;
    }
    public String getExercise() {
        return exercise;
    }
    public void setExercise(String exercise) {
        this.exercise = exercise;
    }
    public String getRepetitions() {
        return repetitions;
    }
    public void setRepetitions(String repetitions) {
        this.repetitions = repetitions;
    }
    @Override
    public String toString() {
        return "Member [_id=" + _id + ", rotine=" + rotine + ", exercise=" + exercise + ", repetitions=" + repetitions
                + "]";
    }
    





    
    
}
