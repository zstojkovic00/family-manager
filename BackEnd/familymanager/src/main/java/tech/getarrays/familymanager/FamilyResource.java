package tech.getarrays.familymanager;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.getarrays.familymanager.model.Family;
import tech.getarrays.familymanager.service.FamilyService;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequestMapping("/family")
public class FamilyResource {
    private final FamilyService familyService;


    public FamilyResource(FamilyService familyService) {
        this.familyService = familyService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Family>> getAllFamily(){
        List<Family> families = familyService.findAllFamily();
        return new ResponseEntity<>(families, HttpStatus.OK);
    }



    @GetMapping("/find/{id}")
    public ResponseEntity<Family> getFamilyById(@PathVariable("id") Long id){
        Family family = familyService.findFamilyById(id);
        return new ResponseEntity<>(family, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Family> addFamily(@RequestBody Family family){
        Family newFamily = familyService.addFamily(family);
        return new ResponseEntity<>(family, HttpStatus.CREATED);
    }


    @PutMapping("/update")
    public ResponseEntity<Family> updateFamily(@RequestBody Family family){
        Family updateFamily = familyService.updateFamily(family);
        return new ResponseEntity<>(updateFamily,HttpStatus.OK);
    }

    @Transactional
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteFamily(@PathVariable("id") Long id){
        familyService.deleteFamily(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }





}
