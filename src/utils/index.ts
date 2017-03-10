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


export const arrayUtils = {
  /**
   * Raises an element in the array by one position based on the index parameter
   */
  'up': ( index: number, array: Array<any> ): Array<any> => {
    const toRaise = array[ index ];
    const toLower = array[ index - 1 ];

    return array.map((element, idx) => {
      if ( (index - 1) === idx ) { return toRaise; }

      if( index === idx ) { return toLower; }

      return element;
    });
  },
  /**
   * Decreases an element in the array by one position based on the index parameter
   */
  'down': ( index: number, array: Array<any> ): Array<any> => {
    const toLower = array[ index ];
    const toRaise = array[ index + 1 ];

    return array.map((element, idx) => {
      if ( (index + 1) === idx ) { return toLower; }

      if( index === idx ) { return toRaise; }

      return element;
    });
  },
  /**
   * Deletes an element in the array
   */
  'delete': ( index: number, array: Array<any> ): Array<any> => {
    return array.map((element, idx) => {
      if( index === idx ) { return; }

      return element;

    }).filter(element => element != null);
  }
}
