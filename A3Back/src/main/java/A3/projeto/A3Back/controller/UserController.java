package A3.projeto.A3Back.controller;

import java.util.List;
import java.util.Optional;

import A3.projeto.A3Back.DAO.IUser;
import A3.projeto.A3Back.model.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/usuarios")
public class UserController  {

    @Autowired
    private IUser dao;



    @GetMapping
    public List<UserModel> listaUsuarios() {
        return (List<UserModel>) dao.findAll();
    }
    @PostMapping
    public UserModel criarUsuario(@RequestBody UserModel user) {
        UserModel newUser = dao.save(user);
        return newUser;
    }

    @PutMapping
    public UserModel editarUsuario(@RequestBody UserModel user) {
        UserModel newUser = dao.save(user);
        return newUser;
    }

    @DeleteMapping("/{id}")
    public UserModel excluirUsuario(@PathVariable Integer id) {
        Optional<UserModel> User = dao.findById(id);
        dao.deleteById(id);
        return User.orElse(null);
    }
}
