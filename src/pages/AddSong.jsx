import DashboardLayout from "../layout/DashboardLayout.jsx";
import {useEffect, useState} from "react";
import {Check, Image, Music} from "lucide-react";
import {albumsAPI, songsAPI} from "../services/apiService.js";
import toast from "react-hot-toast";

const AddSong = () => {
    const [image, setImage] = useState(false);
    const [song, setSong] = useState(false);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [album, setAlbum] = useState("none");
    const [loading, setLoading] = useState(false);
    const [albumData, setAlbumData] = useState([]);
    const [genre, setGenre] = useState("");
    const [lyricsWriter, setLyricsWriter] = useState("");
    const [singers, setSingers] = useState("");
    const [releasedDate, setReleasedDate] = useState("");
    const [mood, setMood] = useState("");
    const [language, setLanguage] = useState("");

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            const request = {
                name,
                desc,
                album,
                genre,
                lyricsWriter,
                singers: singers.split(',').map(s => s.trim()).filter(s => s),
                releasedDate: releasedDate ? new Date(releasedDate).toISOString() : null,
                mood,
                language
            }
            formData.append("request", JSON.stringify(request));
            formData.append("audio", song);
            formData.append("image", image);
            const response = await songsAPI.add(formData);
            if (response.status === 201) {
                toast.success("Song added!");
                setName("")
                setDesc("");
                setAlbum("none");
                setImage(false);
                setSong(false);
                setGenre("");
                setLyricsWriter("");
                setSingers("");
                setReleasedDate("");
                setMood("");
                setLanguage("");
            } else {
                toast.error('Something went wrong while adding song. Please try again');
            }
        }catch (error) {
            toast.error('Something went wrong while adding song.');
        }finally {
            setLoading(false);
        }
    }

    const loadAlbumData = async () => {
        try {
            const response = await albumsAPI.list();
            setAlbumData(response.data.albums);
        }catch (error) {
            toast.error('Failed to load albums');
        }
    }

    useEffect(() => {
        loadAlbumData();
    }, []);

    return (
        <DashboardLayout activeMenu="Add Song">
            {loading ? (
                <div className="grid place-items-center min-h-[80vh]">
                    <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-purple-800 rounded-full animate-spin"></div>
                </div>
            ): (
                <form onSubmit={onSubmitHandler} className="flex flex-col items-start gap-8 text-gray-600 mt-5">
                    <div className="flex gap-8">
                        {/*Upload song*/}
                        <div className="flex flex-col gap-4">
                            <p>Upload Song</p>
                            <input
                                onChange={(e) => setSong(e.target.files[0])}
                                type="file"
                                accept="audio/*"
                                id="song"
                                hidden
                            />
                            <label htmlFor="song"
                                   className="flex flex-col items-center justify-center w-16 h-16 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-purple-400 transition-colors overflow-hidden">
                                {song ? (
                                    <Check className="w-8 h-8 text-purple-500" />
                                ): (
                                    <Music className="w-8 h-8 text-gray-500" />
                                )}
                            </label>
                        </div>
                        {/*Upload image*/}
                        <div className="flex flex-col gap-4">
                            <p>Upload Image</p>
                            <input
                                onChange={(e) => setImage(e.target.files[0])}
                                type="file"
                                accept="image/*"
                                id="image"
                                hidden
                            />
                            <label htmlFor="image"
                                   className="flex flex-col items-center justify-center w-16 h-16 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-purple-400 transition-colors overflow-hidden">
                                {image ? (
                                    <img src={URL.createObjectURL(image)} alt="Preview" className="w-full h-full object-cover rounded-lg"/>
                                ): (
                                    <Image className="w-8 h-8 text-gray-500" />
                                )}
                            </label>
                        </div>
                    </div>

                    {/*song name*/}
                    <div className="flex flex-col gap-2.5">
                        <p>Song name</p>
                        <input
                            type="text"
                            className="bg-transparent outline-purple-600 border-2 border-gray-400 p-2.5 w-[max(40vw, 250px)]"
                            placeholder="Type here"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/*song description*/}
                    <div className="flex flex-col gap-2.5">
                        <p>Song description</p>
                        <input
                            type="text"
                            className="bg-transparent outline-purple-600 border-2 border-gray-400 p-2.5 w-[max(40vw, 250px)]"
                            placeholder="Type here"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </div>

                    {/*Albums*/}
                    <div className="flex flex-col gap-2.5">
                        <p>Album</p>
                        <select
                            defaultValue={album}
                            onChange={(e) => setAlbum(e.target.value)}
                            className="bg-transparent outline-purple-600 border-2 border-gray-400 p-2.5 w-[150px]">
                            <option value="none">None</option>
                            {albumData.map((album, index) => (
                                <option value={album.name} key={index}>{album.name}</option>
                            ))}
                        </select>
                    </div>

                    {/*Genre*/}
                    <div className="flex flex-col gap-2.5">
                        <p>Genre</p>
                        <input
                            type="text"
                            className="bg-transparent outline-purple-600 border-2 border-gray-400 p-2.5 w-[max(40vw, 250px)]"
                            placeholder="e.g., Pop, Rock, Jazz"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                        />
                    </div>

                    {/*Lyrics Writer*/}
                    <div className="flex flex-col gap-2.5">
                        <p>Lyrics Writer</p>
                        <input
                            type="text"
                            className="bg-transparent outline-purple-600 border-2 border-gray-400 p-2.5 w-[max(40vw, 250px)]"
                            placeholder="Type here"
                            value={lyricsWriter}
                            onChange={(e) => setLyricsWriter(e.target.value)}
                        />
                    </div>

                    {/*Singers*/}
                    <div className="flex flex-col gap-2.5">
                        <p>Singers (comma-separated)</p>
                        <input
                            type="text"
                            className="bg-transparent outline-purple-600 border-2 border-gray-400 p-2.5 w-[max(40vw, 250px)]"
                            placeholder="e.g., Singer 1, Singer 2"
                            value={singers}
                            onChange={(e) => setSingers(e.target.value)}
                        />
                    </div>

                    {/*Released Date*/}
                    <div className="flex flex-col gap-2.5">
                        <p>Released Date</p>
                        <input
                            type="date"
                            className="bg-transparent outline-purple-600 border-2 border-gray-400 p-2.5 w-[max(40vw, 250px)]"
                            value={releasedDate}
                            onChange={(e) => setReleasedDate(e.target.value)}
                        />
                    </div>

                    {/*Mood*/}
                    <div className="flex flex-col gap-2.5">
                        <p>Mood</p>
                        <select
                            value={mood}
                            onChange={(e) => setMood(e.target.value)}
                            className="bg-transparent outline-purple-600 border-2 border-gray-400 p-2.5 w-[200px]">
                            <option value="">Select Mood</option>
                            <option value="Happy">Happy</option>
                            <option value="Sad">Sad</option>
                            <option value="Romantic">Romantic</option>
                            <option value="Energetic">Energetic</option>
                            <option value="Calm">Calm</option>
                            <option value="Party">Party</option>
                        </select>
                    </div>

                    {/*Language*/}
                    <div className="flex flex-col gap-2.5">
                        <p>Language</p>
                        <input
                            type="text"
                            className="bg-transparent outline-purple-600 border-2 border-gray-400 p-2.5 w-[max(40vw, 250px)]"
                            placeholder="e.g., English, Hindi, Bengali"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                        />
                    </div>

                    {/*Submit button*/}
                    <button type="submit" className="text-base bg-[#ca68de] text-white py-2.5 px-14 cursor-pointer mb-2">
                        ADD
                    </button>
                </form>
            )}
        </DashboardLayout>
    )
}

export default AddSong;