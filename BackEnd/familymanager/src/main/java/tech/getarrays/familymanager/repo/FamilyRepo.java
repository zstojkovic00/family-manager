package tech.getarrays.familymanager.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import tech.getarrays.familymanager.model.Family;

import java.util.Optional;

public interface FamilyRepo extends JpaRepository<Family, Long> {

    void deleteFamilyById(Long id);

    Optional<Family> findFamilyById(Long id);
}
