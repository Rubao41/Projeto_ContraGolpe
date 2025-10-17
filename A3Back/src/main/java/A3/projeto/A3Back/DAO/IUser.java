package A3.projeto.A3Back.DAO;

import org.springframework.data.repository.CrudRepository;

import A3.projeto.A3Back.model.UserModel;

public interface IUser extends CrudRepository<UserModel, Integer> {
}
