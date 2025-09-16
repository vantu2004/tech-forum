import Post from "../models/post.model.js";
import cloudinary from "../lib/cloudinary.js";

export const addPost = async (req, res) => {
  try {
    const userId = req.userId;
    const { desc, images } = req.body;

    // Validate input
    if (!desc && (!images || images.length === 0)) {
      return res.status(400).json({
        success: false,
        error: "Post must have description or images",
      });
    }

    let imageUrls = [];

    if (images && images.length > 0) {
      // Upload từng ảnh lên Cloudinary
      const uploadPromises = images.map((img) =>
        cloudinary.uploader.upload(img, {
          folder: "posts", // thư mục trên Cloudinary
          resource_type: "image",
        })
      );

      const results = await Promise.all(uploadPromises);
      imageUrls = results.map((r) => r.secure_url);
    }

    // Tạo bài viết mới
    const newPost = new Post({
      userId,
      desc,
      images: imageUrls, // lưu URL thay vì base64
    });

    let savedPost = await newPost.save();

    // Populate ngay bài vừa tạo
    savedPost = await savedPost.populate({
      path: "userId",
      select: "email profile",
      populate: {
        path: "profile",
        select: "name headline profile_pic",
      },
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: savedPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
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

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "userId", // populate từ Post → UserAuth
        select: "email profile", // chọn trường cần lấy
        populate: {
          path: "profile", // populate tiếp từ UserAuth → UserProfile
          select: "name headline profile_pic", // chỉ lấy field cần thiết
        },
      })
      .populate("likes", "email"); // nếu muốn populate thêm mảng likes

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const getPostsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 0, skip = 0 } = req.query;

    const posts = await Post.find({ userId })
      .sort({ createdAt: -1 })
      .skip(Number(skip))
      .limit(Number(limit));

    res.json({ success: true, posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
