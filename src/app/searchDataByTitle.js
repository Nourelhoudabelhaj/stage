// dataUtils.js

// Function to search data by title
export const searchDataByTitle = (data, titleToSearch) => {
    const lowerCaseTitle = titleToSearch.toLowerCase();
    const filteredData = data.filter((item) =>
        item.title.toLowerCase().includes(lowerCaseTitle)
    );
    return filteredData;
};
