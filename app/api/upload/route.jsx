// pages/api/upload.js
import { hashPassword } from '@/app/_utils/GlobalApi';
import formidable from 'formidable';
import { GraphQLClient, gql } from 'graphql-request';

// eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjI1MzkzMjIsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NseWhjejVmMTAxajYwN3c5eHcwa253dTcvbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI1M2NlYzE5Ni1iMTBkLTRjNjAtOTA3Yi02ZGIyNDcyZWRiMDciLCJqdGkiOiJjbHpibmZybGkwaWkxMDdtcDZqbTA5dDMzIn0.CaYwzNbn5uadUGfUf0JCh3d_LZJsyko0OU_7urkBENArv-xV46ZywhTASZu2PYJLSe1ipGv78VuU5MoNwQxwP_NYi51oS0bp3ApqaD1wxkt2VnvZvjPacEe1zw2TUqchkDM9ia-kfxUcvQkto8fEr-L-V4A28prkBeaj8UbBcL_7_VQJQd8xw2gX5ZTTsIUSvfxHrugTWVUO0cLMVr4IqQchJy_pi8z33UXdvXiId1UgBfXpKG_yy0UyGYktTXsxQOlPkYPllFWQWoSPqxBUL_dwf7kv76rOj1CLBGFv3uD11yfzLg9K9Yq6ZxEbjV9akAyVMV1r3MrFXXfqPd531xuJG_w5vYtFouz9cf6Ny1LiYu26vDOytOAuUQPBIiwfJ8OKYJubVPvyerohGOE0jheFThYtDrLSNuj7IZ89vd6NCmTvoyeQj9u0gsKac2WyW5xTrT_zhKb7hr0HYK38RfgkQH0Psc3XwzNa2IFUCHNT3jeYES8Fs42miZDBx7JispNFNdFASBjoA75wXnjcR8T45eZEIZUnHCePKvta4j06R1dEL9rBxkN8Zwr8e3oIiy1OltoLd2uS8Ok9hiTxgGPgVbUnF06KRUw0HgwY9qQ561TfAUK3ukGOfHyQhGGyiQ8sEV-PVa8gCCGZMBaBXTBMVoCHBRD2bWGYCcS_85M


export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadBannerImage = async (file) => {
  const formData = new FormData();
  formData.append('fileUpload', file);

  const response = await fetch('https://api-ap-south-1.hygraph.com/v2/clyhcz5f101j607w9xw0knwu7/master/upload', {
    method: 'POST',
    headers: {
      Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjI1MzkzMjIsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NseWhjejVmMTAxajYwN3c5eHcwa253dTcvbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI1M2NlYzE5Ni1iMTBkLTRjNjAtOTA3Yi02ZGIyNDcyZWRiMDciLCJqdGkiOiJjbHpibmZybGkwaWkxMDdtcDZqbTA5dDMzIn0.CaYwzNbn5uadUGfUf0JCh3d_LZJsyko0OU_7urkBENArv-xV46ZywhTASZu2PYJLSe1ipGv78VuU5MoNwQxwP_NYi51oS0bp3ApqaD1wxkt2VnvZvjPacEe1zw2TUqchkDM9ia-kfxUcvQkto8fEr-L-V4A28prkBeaj8UbBcL_7_VQJQd8xw2gX5ZTTsIUSvfxHrugTWVUO0cLMVr4IqQchJy_pi8z33UXdvXiId1UgBfXpKG_yy0UyGYktTXsxQOlPkYPllFWQWoSPqxBUL_dwf7kv76rOj1CLBGFv3uD11yfzLg9K9Yq6ZxEbjV9akAyVMV1r3MrFXXfqPd531xuJG_w5vYtFouz9cf6Ny1LiYu26vDOytOAuUQPBIiwfJ8OKYJubVPvyerohGOE0jheFThYtDrLSNuj7IZ89vd6NCmTvoyeQj9u0gsKac2WyW5xTrT_zhKb7hr0HYK38RfgkQH0Psc3XwzNa2IFUCHNT3jeYES8Fs42miZDBx7JispNFNdFASBjoA75wXnjcR8T45eZEIZUnHCePKvta4j06R1dEL9rBxkN8Zwr8e3oIiy1OltoLd2uS8Ok9hiTxgGPgVbUnF06KRUw0HgwY9qQ561TfAUK3ukGOfHyQhGGyiQ8sEV-PVa8gCCGZMBaBXTBMVoCHBRD2bWGYCcS_85M
`,
    },
    body: formData,
  });

  const uploadData = await response.json();

  if (!response.ok) {
    throw new Error(uploadData.errors[0].message);
  }

  return uploadData.id; // Or the key that contains the uploaded file URL or ID
};

export default async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error parsing the files' });
    }

    try {
      const bannerImageId = await uploadBannerImage(files.file);

      const hashedPassword = await hashPassword(fields.password);

      const query = gql`
        mutation MyMutation {
          createRestro(
            data: {
              name: "${fields.name}"
              aboutUs: "${fields.aboutUs}"
              password: "${hashedPassword}"
              restroType: top
              address: "${fields.address}"
              workingHours: "${fields.workingHours}"
              restroUser: { create: { email: "${fields.email}" } }
              category: { connect: { slug: "all" } }
              banner: { create: { uploadUrl: "${bannerImageId}" } }
            }
          ) {
            id
          }
          publishManyRestros(to: PUBLISHED) {
            count
          }
        }
      `;

      const graphQLClient = new GraphQLClient('https://ap-south-1.cdn.hygraph.com/content/clyhcz5f101j607w9xw0knwu7/master', {
        headers: {
          authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MjI1MzkzMjIsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NseWhjejVmMTAxajYwN3c5eHcwa253dTcvbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiI1M2NlYzE5Ni1iMTBkLTRjNjAtOTA3Yi02ZGIyNDcyZWRiMDciLCJqdGkiOiJjbHpibmZybGkwaWkxMDdtcDZqbTA5dDMzIn0.CaYwzNbn5uadUGfUf0JCh3d_LZJsyko0OU_7urkBENArv-xV46ZywhTASZu2PYJLSe1ipGv78VuU5MoNwQxwP_NYi51oS0bp3ApqaD1wxkt2VnvZvjPacEe1zw2TUqchkDM9ia-kfxUcvQkto8fEr-L-V4A28prkBeaj8UbBcL_7_VQJQd8xw2gX5ZTTsIUSvfxHrugTWVUO0cLMVr4IqQchJy_pi8z33UXdvXiId1UgBfXpKG_yy0UyGYktTXsxQOlPkYPllFWQWoSPqxBUL_dwf7kv76rOj1CLBGFv3uD11yfzLg9K9Yq6ZxEbjV9akAyVMV1r3MrFXXfqPd531xuJG_w5vYtFouz9cf6Ny1LiYu26vDOytOAuUQPBIiwfJ8OKYJubVPvyerohGOE0jheFThYtDrLSNuj7IZ89vd6NCmTvoyeQj9u0gsKac2WyW5xTrT_zhKb7hr0HYK38RfgkQH0Psc3XwzNa2IFUCHNT3jeYES8Fs42miZDBx7JispNFNdFASBjoA75wXnjcR8T45eZEIZUnHCePKvta4j06R1dEL9rBxkN8Zwr8e3oIiy1OltoLd2uS8Ok9hiTxgGPgVbUnF06KRUw0HgwY9qQ561TfAUK3ukGOfHyQhGGyiQ8sEV-PVa8gCCGZMBaBXTBMVoCHBRD2bWGYCcS_85M
`,
        },
      });

      const result = await graphQLClient.request(query);
      res.status(200).json({ data: result });
    } catch (error) {
      console.log("tch")
    }
  });
};
