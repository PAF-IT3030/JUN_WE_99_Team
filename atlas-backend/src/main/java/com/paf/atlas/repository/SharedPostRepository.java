package com.paf.atlas.repository;

import com.paf.atlas.model.SharedPost;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SharedPostRepository extends MongoRepository<SharedPost, String> {
}
