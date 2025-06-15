
import { useState } from 'react';
import { Star, ThumbsUp, User, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Review = {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  serviceType: string;
  helpful: number;
  verified: boolean;
};

type ProviderReviewsProps = {
  providerId: string;
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
};

export default function ProviderReviews({ providerId, reviews, averageRating, totalReviews }: ProviderReviewsProps) {
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: '',
    serviceType: ''
  });

  const ratingBreakdown = [
    { stars: 5, count: 45, percentage: 75 },
    { stars: 4, count: 12, percentage: 20 },
    { stars: 3, count: 2, percentage: 3 },
    { stars: 2, count: 1, percentage: 2 },
    { stars: 1, count: 0, percentage: 0 }
  ];

  const handleSubmitReview = () => {
    // Handle review submission
    console.log('Submitting review:', newReview);
    setShowWriteReview(false);
    setNewReview({ rating: 0, comment: '', serviceType: '' });
  };

  const StarRating = ({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'lg' }) => {
    const starSize = size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';
    
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= rating ? 'text-amber-500 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Reviews Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Customer Reviews</span>
            <Button
              variant="outline"
              onClick={() => setShowWriteReview(!showWriteReview)}
            >
              Write a Review
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Rating Summary */}
            <div className="text-center">
              <div className="text-4xl font-bold text-estate-800 mb-2">{averageRating}</div>
              <StarRating rating={averageRating} size="lg" />
              <p className="text-estate-600 mt-2">Based on {totalReviews} reviews</p>
            </div>

            {/* Rating Breakdown */}
            <div className="space-y-2">
              {ratingBreakdown.map((item) => (
                <div key={item.stars} className="flex items-center gap-3">
                  <span className="text-sm text-estate-600 w-8">{item.stars}★</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-amber-500 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-estate-600 w-8">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Write Review Form */}
      {showWriteReview && (
        <Card>
          <CardHeader>
            <CardTitle>Write a Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-estate-700 mb-2">
                Your Rating
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                  >
                    <Star
                      className={`w-6 h-6 transition-colors ${
                        star <= newReview.rating
                          ? 'text-amber-500 fill-current'
                          : 'text-gray-300 hover:text-amber-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-estate-700 mb-2">
                Your Review
              </label>
              <Textarea
                placeholder="Share your experience with this service provider..."
                value={newReview.comment}
                onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                className="min-h-24"
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleSubmitReview}
                className="bg-vibrant-blue hover:bg-blue-700"
                disabled={!newReview.rating || !newReview.comment}
              >
                Submit Review
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowWriteReview(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={review.userAvatar} />
                  <AvatarFallback>
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-estate-800">{review.userName}</h4>
                    {review.verified && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Verified
                      </Badge>
                    )}
                    <Badge variant="outline">{review.serviceType}</Badge>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <StarRating rating={review.rating} />
                    <span className="text-sm text-estate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {review.date}
                    </span>
                  </div>

                  <p className="text-estate-600 mb-3">{review.comment}</p>

                  <button className="flex items-center gap-2 text-sm text-estate-500 hover:text-estate-700">
                    <ThumbsUp className="w-3 h-3" />
                    Helpful ({review.helpful})
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
