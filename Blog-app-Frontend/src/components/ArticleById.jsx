import { useParams, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../store/authStore";

import {
  articlePageWrapper,
  articleHeader,
  articleCategory,
  articleMainTitle,
  articleAuthorRow,
  authorInfo,
  articleContent,
  articleFooter,
  articleActions,
  editBtn,
  deleteBtn,
  loadingClass,
  errorClass,
  commentsSection,
  commentFormCard,
  commentTextarea,
  commentList,
  commentItem,
  commentAuthor,
  commentText,
  submitBtn,
} from "../styles/common.js";

function ArticleByID() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const user = useAuth((state) => state.currentUser);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  const [article, setArticle] = useState(location.state || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [commentTextValue, setCommentTextValue] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  // ✅ GET ARTICLE
  useEffect(() => {
    const getArticle = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:4000/user-api/articles/${id}`,
          { withCredentials: true }
        );
        setArticle(res.data.payload);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load article");
      } finally {
        setLoading(false);
      }
    };

    getArticle();
  }, [id]);

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  const comments = article?.comments || [];

  // ✅ ADD COMMENT
  const addComment = async (e) => {
    e.preventDefault();

    if (!commentTextValue.trim()) {
      toast.error("Write something");
      return;
    }

    if (!isAuthenticated) {
      toast.error("Login first");
      navigate("/login");
      return;
    }

    try {
      setIsSubmittingComment(true);

      const res = await axios.post(
        "http://localhost:4000/user-api/articles",
        {
          articleId: id,
          user: user._id || user.userId,
          comment: commentTextValue,
        },
        { withCredentials: true }
      );

      setArticle(res.data.payload);
      setCommentTextValue("");
      toast.success("Comment added");

    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  if (loading) return <p className={loadingClass}>Loading...</p>;
  if (error) return <p className={errorClass}>{error}</p>;

  return (
    <div className={articlePageWrapper}>
      <div className={articleHeader}>
        <h1 className={articleMainTitle}>{article?.title}</h1>

        <div className={articleAuthorRow}>
          <span className={authorInfo}>
            {article?.author?.firstName}
          </span>
          <span>{formatDate(article?.createdAt)}</span>
        </div>
      </div>

      <div className={articleContent}>{article?.content}</div>

      {/* AUTHOR ACTIONS */}
      {user?.role === "AUTHOR" && (
        <div className={articleActions}>
          <button className={editBtn}>Edit</button>
          <button className={deleteBtn}>Delete</button>
        </div>
      )}

      {/* COMMENTS */}
      <section className={commentsSection}>
        <h2>Comments</h2>

        {/* FORM */}
        <form onSubmit={addComment} className={commentFormCard}>
          <textarea
            value={commentTextValue}
            onChange={(e) => setCommentTextValue(e.target.value)}
            className={commentTextarea}
            placeholder="Write comment..."
          />

          <button type="submit" className={submitBtn}>
            {isSubmittingComment ? "Posting..." : "Post"}
          </button>
        </form>

        {/* LIST */}
        {comments.length === 0 ? (
          <p>No comments yet</p>
        ) : (
          <div className={commentList}>
            {comments.map((c, i) => (
              <div key={i} className="flex gap-3 items-start border p-2 rounded">

                {/* ✅ PROFILE IMAGE */}
                <img
                  src={c.user?.profileImageUrl || "https://via.placeholder.com/40"}
                  className="w-10 h-10 rounded-full"
                />

                <div>
                  <p className={commentAuthor}>
                    {c.user?.firstName || "User"}
                  </p>

                  <p className="text-xs text-gray-500">
                    {formatDate(c.createdAt)}
                  </p>

                  <p className={commentText}>{c.comment}</p>
                </div>

              </div>
            ))}
          </div>
        )}
      </section>

      <div className={articleFooter}>
        Updated: {formatDate(article?.updatedAt)}
      </div>
    </div>
  );
}

export default ArticleByID;