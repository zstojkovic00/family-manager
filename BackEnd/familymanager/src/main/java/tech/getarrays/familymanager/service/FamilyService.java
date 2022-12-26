package tech.getarrays.familymanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tech.getarrays.familymanager.exception.UserNotFoundException;
import tech.getarrays.familymanager.model.Family;
import tech.getarrays.familymanager.repo.FamilyRepo;

import java.util.List;
import java.util.UUID;

@Service
public class FamilyService {
    private final FamilyRepo familyRepo;


    @Autowired
    public FamilyService(FamilyRepo familyRepo) {
        this.familyRepo = familyRepo;
    }


    public Family addFamily(Family family){
          family.setFamilyCode(UUID.randomUUID().toString());
          return familyRepo.save(family);
    }

    public List<Family> findAllFamily(){
        return familyRepo.findAll();
    }

    public Family updateFamily(Family family){
        return familyRepo.save(family);
    }

    public Family findFamilyById(Long id){
        return familyRepo.findFamilyById(id).orElseThrow(()-> new UserNotFoundException("User by id"+id+"was not found"));
    }

    public void deleteFamily(Long id){
        familyRepo.deleteFamilyById(id);

    }
}
