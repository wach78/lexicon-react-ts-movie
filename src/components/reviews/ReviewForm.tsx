import { useState } from "react";
import type { ReviewCreateDto } from "../../dtos/review/ReviewCreateDto";
import type { SubmitEvent } from "react";
import { REVIEW_VALIDATION } from "../../constants/ReviewValidationConstants";

interface ReviewFormProps {
  onSubmit: (review: ReviewCreateDto) => Promise<void>;
}

const ReviewForm = ({ onSubmit }: ReviewFormProps) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const [reviewerName, setReviewerName] = useState("");

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const review: ReviewCreateDto = {
      comment,
      rating,
      reviewerName,
    };

    await onSubmit(review);

    setComment("");
    setReviewerName("");
    setRating(REVIEW_VALIDATION.minimumRating);
  };

  return (
    <form onSubmit={handleSubmit} method="post">
      <div className="mb-3">
        <label htmlFor="reviewerName" className="form-label">
          Reviewer
        </label>

        <input
          id="reviewerName"
          type="text"
          className="form-control"
          maxLength={REVIEW_VALIDATION.reviewerNameMaxLength}
          value={reviewerName}
          onChange={(event) => setReviewerName(event.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="comment" className="form-label">
          Comment
        </label>

        <textarea
          id="comment"
          className="form-control"
          maxLength={REVIEW_VALIDATION.commentMaxLength}
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="rating" className="form-label">
          Rating
        </label>

        <input
          id="rating"
          type="number"
          className="form-control"
          min={REVIEW_VALIDATION.minimumRating}
          max={REVIEW_VALIDATION.maximumRating}
          value={rating}
          onChange={(event) => setRating(Number(event.target.value))}
        />
      </div>

      <button type="submit" className="btn btn-success">
        Add Review
      </button>
    </form>
  );
};

export default ReviewForm;
