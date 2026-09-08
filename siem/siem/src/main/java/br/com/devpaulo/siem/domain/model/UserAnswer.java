package br.com.devpaulo.siem.domain.model;

import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "user_answer")
public class UserAnswer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NotNull
	@NotEmpty
	private Double userAnswer;
	@NotNull
	private Boolean correct;
	@NotNull
	@JoinColumn(name = "user_id")
	@ManyToOne
	private User userId;
	@NotNull
	@JoinColumn(name = "exercise_id")
	@ManyToOne
	private Exercise exerciseId;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Double getUserAnswer() {
		return userAnswer;
	}

	public void setUserAnswer(Double userAnswer) {
		this.userAnswer = userAnswer;
	}

	public Boolean getCorrect() {
		return correct;
	}

	public void setCorrect(Boolean correct) {
		this.correct = correct;
	}

	public User getUserId() {
		return userId;
	}

	public void setUserId(User userId) {
		this.userId = userId;
	}

	public Exercise getExerciseId() {
		return exerciseId;
	}

	public void setExerciseId(Exercise exerciseId) {
		this.exerciseId = exerciseId;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UserAnswer other = (UserAnswer) obj;
		return Objects.equals(id, other.id);
	}

}
