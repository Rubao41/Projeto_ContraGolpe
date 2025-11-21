package A3.projeto.A3Back.controller;

import java.util.List;
import A3.projeto.A3Back.Repository.EmpresaRepository;
import A3.projeto.A3Back.Repository.GolpeRepository;
import A3.projeto.A3Back.model.GolpeModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cadastrogolpes")
public class GolpeController {

    private final GolpeRepository golpeRepository;
    private final EmpresaRepository empresaRepository;

    // Injeção via construtor
    public GolpeController(GolpeRepository golpeRepository, EmpresaRepository empresaRepository) {
        this.golpeRepository = golpeRepository;
        this.empresaRepository = empresaRepository;
    }

    @PostMapping
    public ResponseEntity<?> cadastrarGolpe(@RequestBody GolpeModel golpe) {
        System.out.println(">>> [GolpeController] Cadastro recebido: " + golpe);

        if (golpe.getEmpresa() == null || golpe.getEmpresa().trim().isEmpty()) {
            System.out.println(">>> [GolpeController] Empresa não informada");
            return ResponseEntity.badRequest().body("O nome da empresa é obrigatório");
        }

        golpe.setEmpresa(golpe.getEmpresa().trim().toUpperCase());
        GolpeModel salvo = golpeRepository.save(golpe);

        System.out.println(">>> [GolpeController] Golpe salvo com ID: " + salvo.getId());
        return ResponseEntity.ok(salvo);
    }

    @GetMapping
    public List<GolpeModel> listarGolpes() {
        return golpeRepository.findAll();
    }

}

