import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { videoId } = req.query;

  if (!videoId) {
    return res.status(400).json({ error: 'Video ID is required' });
  }

  try {
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${process.env.YOUTUBE_API_KEY}`);
    if (response.status === 200) {
      const transcript = response.data.items.map((item: any) => item.snippet.textOriginal).join('\n');
      res.status(200).json({ transcript });
    } else {
      res.status(response.status).json({ error: 'Failed to retrieve transcript' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve transcript' });
  }
};

export default handler;