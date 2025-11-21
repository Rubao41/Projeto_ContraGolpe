package A3.projeto.A3Back.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import A3.projeto.A3Back.model.GolpeModel;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GolpeRepository extends JpaRepository<GolpeModel, Integer> {
    List<GolpeModel> findByEmpresaIgnoreCase(String empresa);
    List<GolpeModel> findByEmpresaContainingIgnoreCase(String empresa);
}


