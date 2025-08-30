import Post from "../models/post.model.js";

export const addPost = async (req, res) => {
  try {
    const userId = req.userId;
    const { desc, images } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!desc && (!images || images.length === 0)) {
      return res.status(400).json({
        success: false,
        error: "Post must have description or images",
      });
    }

    // Tạo bài viết mới
    const newPost = new Post({
      userId,
      desc,
      images,
    });

    // Lưu vào DB
    const savedPost = await newPost.save();

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: savedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const likeDislikePost = async (req, res) => {
  try {
    const userId = req.userId;
    const { postId } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
      });
    }

    let updatedPost;

    if (post.likes.includes(userId)) {
      // Nếu user đã like thì bỏ like
      updatedPost = await Post.findByIdAndUpdate(
        postId,
        // $pull là toán tử MongoDB để xóa phần tử trong mảng
        { $pull: { likes: userId } },
        { new: true }
      );
    } else {
      // Nếu chưa like thì thêm like
      updatedPost = await Post.findByIdAndUpdate(
        postId,
        // $addToSet là toán tử MongoDB để thêm phần tử vào mảng
        { $addToSet: { likes: userId } }, // $addToSet tránh bị trùng
        { new: true }
      );
    }

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
