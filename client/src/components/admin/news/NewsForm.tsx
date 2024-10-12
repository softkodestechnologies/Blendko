import React, { useState, useEffect } from 'react';
import { useCreateNewsMutation, useUpdateNewsMutation } from '@/services/newsService';
import Image from 'next/image';
import ReactQuill from 'react-quill';
import styles from './NewsStyles.module.css';
import 'react-quill/dist/quill.snow.css';

interface NewsFormProps {
  news?: any | null;
  onClose: () => void;
}

const NewsForm: React.FC<NewsFormProps> = ({ news, onClose }) => {
  const [createNews] = useCreateNewsMutation();
  const [updateNews] = useUpdateNewsMutation();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    publishDate: '',
    publishTime: '',
    status: 'Draft',
    tags: '',
    content: '',
    email: '',
  });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const toolbarOptions = [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'align': [] }],
    ['link', 'image'],
    ['clean'] 
  ];

  const modules = {
    toolbar: toolbarOptions
  };

  useEffect(() => {
    if (news) {
      setFormData({
        title: news.title,
        author: news.author,
        category: news.category,
        publishDate: news.publishDate.split('T')[0],
        publishTime: news.publishDate.split('T')[1].slice(0, 5),
        status: news.status,
        tags: news.tags.join(', '),
        content: news.content,
        email: news.email || '',
      });
    }
  }, [news]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContentChange = (content: string) => {
    setFormData({ ...formData, content });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); 
    const newsData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      newsData.append(key, value);
    });
    if (image) {
      newsData.append('image', image);
    }
    console.log(newsData, 'This should log news to output')
    console.log(Array.from(newsData.entries()), 'FormData entries'); 
  
    try {
      if (news) {
        const updateData: any = {
          title: formData.title,
          author: formData.author,
          category: formData.category,
          publishDate: formData.publishDate,
          publishTime: formData.publishTime,
          status: formData.status,
          tags: formData.tags.split(',').map(tag => tag.trim()),
          content: formData.content,
          email: formData.email,
        };
        if (image) {
          updateData.image = image;
        }
        await updateNews({ id: news._id, newsData: updateData }).unwrap();
      } else {
        await createNews(newsData).unwrap();
      }
      onClose();
    } catch (err) {
      console.error('Failed to save the news:', err);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <form onSubmit={handleSubmit} className={styles.newsForm}>
      <h2>{news ? 'Update News' : 'Create News'}</h2>
      <div className={styles.formGroup}>
        <label htmlFor="title">News Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="author">News Author</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="category">Select Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
        >
          <option value="">Select a category</option>
          <option value="Fashion">Fashion</option>
          <option value="Beauty">Beauty</option>
          <option value="Celebrity">Celebrity</option>
        </select>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email">Enter Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="publishDate">Choose Publish Date</label>
        <input
          type="date"
          id="publishDate"
          name="publishDate"
          value={formData.publishDate}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="publishTime">Choose Publish Time</label>
        <input
          type="time"
          id="publishTime"
          name="publishTime"
          value={formData.publishTime}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="status">Select Publish Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          required
        >
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
        </select>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="tags">News Tags (comma-separated)</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleInputChange}
        />
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="content">Enter News Content</label>
        <ReactQuill
          theme="snow"
          value={formData.content}
          onChange={handleContentChange}
          modules={modules}
          className={styles.quillEditor}
        />
      </div>
      <div className={styles.imageUpload}>
        <label htmlFor="image">Upload Banner Image</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleImageChange}
          accept="image/*"
        />
        {imagePreview && (
          <>
            <Image src={imagePreview} alt="Preview" className={styles.imagePreview} width={500} height={100} />
            <button type="button" onClick={handleRemoveImage} className={styles.removeImage}>
              Remove Image
            </button>
          </>
        )}
      </div>
      <div className={styles.formActions}>
        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : news ? 'Update' : 'Create'} News
        </button>
        <button type="button" onClick={onClose} className={styles.cancelButton}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NewsForm;