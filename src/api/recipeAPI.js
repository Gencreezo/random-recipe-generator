import axios from 'axios'
import mockData from '@/api/data.json'

const axiosInstance = axios.create({
	baseURL: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com', // Replace with your API base URL
	headers: {
		'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY, // Access API key from environment variables
		'Content-Type': 'application/json',
	},
})

export async function getRandomRecipes(tags) {
	console.log(tags)
	try {
		const response = await axiosInstance.get('/recipes/random', {
			params: {
				tags: tags,
				number: 5,
			},
		})
		return response.data.recipes
	} catch (error) {
		console.error('Error fetching recipes:', error)
		console.warn("Couldn't retrieve data from API, returning mockdata instead")
		return mockData.recipes
	}
}
