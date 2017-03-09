/**
 * Youtube video pattern
 * Source: http://stackoverflow.com/questions/3717115/regular-expression-for-youtube-links
 */
const youtubeVideoPattern = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;

/**
 * Extracts a youtube video id from a url
 * 
 * @export
 * @param {string} url 
 * @returns {string} 
 */
export function extractYoutubeId( url: string ): string {
  const matches = url.match( youtubeVideoPattern );

  if ( matches && matches.length > 0 ) {
    return matches[1];
  }
  
  return '';
};
