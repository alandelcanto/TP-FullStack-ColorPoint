import { fileURLToPath } from "url"
import { dirname, join} from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const publicPath = join(__dirname, '../public')
export const viewsPath = join(__dirname, '../views')